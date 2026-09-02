import { Resend } from 'resend';

/**
 * Envoi d'emails transactionnels via Resend.
 *
 * Trois usages : formulaire de contact, demande d'acces a la Room, et lien de
 * connexion (magic link) emis par NextAuth.
 *
 * Sans RESEND_API_KEY, l'envoi est journalise dans la console au lieu d'etre
 * expedie. C'est un confort de developpement : en production, l'absence de cle
 * leve une erreur pour eviter les envois silencieusement perdus.
 */

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const FROM = process.env.EMAIL_FROM ?? 'Bridgeline Partners <onboarding@resend.dev>';
const INBOX = process.env.CONTACT_INBOX ?? 'contact@bridgelinepartners.com';

type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};

/** Neutralise le HTML dans les valeurs saisies par l'utilisateur. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function sendEmail({ to, subject, html, replyTo }: SendEmailInput) {
  if (!resend) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        'RESEND_API_KEY absente : impossible d’envoyer un email en production.',
      );
    }
    console.warn(
      `[email] RESEND_API_KEY absente, envoi simule.\n  a : ${String(to)}\n  objet : ${subject}`,
    );
    return;
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
  });

  if (error) {
    throw new Error(`Envoi Resend echoue : ${error.message}`);
  }
}

/** Gabarit commun : entete navy, corps sobre, aucune image externe. */
function layout(title: string, bodyHtml: string) {
  return `
  <div style="margin:0;padding:24px;background:#f3f6fb;font-family:Helvetica,Arial,sans-serif;color:#10203a;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #dce4f0;border-radius:14px;overflow:hidden;">
      <tr>
        <td style="background:#0a1a33;padding:20px 24px;color:#ffffff;font-size:15px;font-weight:600;letter-spacing:0.02em;">
          Bridgeline Partners
        </td>
      </tr>
      <tr>
        <td style="padding:24px;">
          <h1 style="margin:0 0 16px;font-size:18px;line-height:1.3;color:#10203a;">${escapeHtml(title)}</h1>
          ${bodyHtml}
        </td>
      </tr>
      <tr>
        <td style="padding:16px 24px;border-top:1px solid #dce4f0;font-size:12px;color:#5a6b85;">
          Bridgeline Partners, Luxembourg et Geneve.
        </td>
      </tr>
    </table>
  </div>`;
}

function field(label: string, value: string) {
  return `<p style="margin:0 0 12px;font-size:14px;line-height:1.5;">
    <span style="display:block;color:#5a6b85;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">${escapeHtml(label)}</span>
    <span style="color:#10203a;">${escapeHtml(value)}</span>
  </p>`;
}

export type ContactPayload = {
  name: string;
  email: string;
  company?: string | null;
  message: string;
};

/** Formulaire de contact du site public : notification a la boite interne. */
export async function sendContactNotification(payload: ContactPayload) {
  await sendEmail({
    to: INBOX,
    replyTo: payload.email,
    subject: `Contact site : ${payload.name}`,
    html: layout(
      'Nouveau message depuis le site',
      [
        field('Nom', payload.name),
        field('Email', payload.email),
        field('Societe', payload.company || 'Non renseignee'),
        field('Message', payload.message),
      ].join(''),
    ),
  });
}

export type AccessRequestPayload = {
  name: string;
  email: string;
  company?: string | null;
  message?: string | null;
};

/**
 * Demande d'acces a la Room : notification a l'equipe, puis accuse de reception
 * au demandeur. Aucun compte n'est cree a ce stade.
 */
export async function sendAccessRequestEmails(payload: AccessRequestPayload) {
  await sendEmail({
    to: INBOX,
    replyTo: payload.email,
    subject: `Demande d’acces Bridgeline Room : ${payload.name}`,
    html: layout(
      'Nouvelle demande d’acces a la Room',
      [
        field('Nom', payload.name),
        field('Email', payload.email),
        field('Societe', payload.company || 'Non renseignee'),
        field('Message', payload.message || 'Aucun message'),
        `<p style="margin:16px 0 0;font-size:13px;color:#5a6b85;">Qualifier la demande avant de provisionner un acces.</p>`,
      ].join(''),
    ),
  });

  await sendEmail({
    to: payload.email,
    subject: 'Votre demande d’acces a la Bridgeline Room',
    html: layout(
      'Demande bien recue',
      `<p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#10203a;">
         Bonjour ${escapeHtml(payload.name)},
       </p>
       <p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#10203a;">
         Nous avons bien recu votre demande d’acces a la Bridgeline Room. Notre equipe
         revient vers vous apres verification de votre eligibilite en tant qu’investisseur
         professionnel.
       </p>
       <p style="margin:0;font-size:14px;line-height:1.6;color:#5a6b85;">
         Bridgeline Partners
       </p>`,
    ),
  });
}

/** Lien de connexion sans mot de passe, emis par NextAuth. */
export async function sendMagicLinkEmail(to: string, url: string) {
  await sendEmail({
    to,
    subject: 'Votre lien de connexion a la Bridgeline Room',
    html: layout(
      'Connexion a la Bridgeline Room',
      `<p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#10203a;">
         Cliquez sur le bouton ci-dessous pour ouvrir votre session. Ce lien expire
         dans 24 heures et ne peut servir qu’une fois.
       </p>
       <p style="margin:0 0 20px;">
         <a href="${url}" style="display:inline-block;background:#1c56a8;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:10px;font-size:14px;font-weight:600;">
           Ouvrir ma session
         </a>
       </p>
       <p style="margin:0;font-size:13px;line-height:1.6;color:#5a6b85;">
         Si vous n’etes pas a l’origine de cette demande, ignorez ce message.
       </p>`,
    ),
  });
}
