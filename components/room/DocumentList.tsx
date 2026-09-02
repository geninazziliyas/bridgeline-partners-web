import { DownloadSimple, FilePdf } from '@phosphor-icons/react/dist/ssr';

import type { DocumentView } from '@/lib/portfolio';
import { formatBytes, formatShortDate } from '@/lib/utils';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';

/**
 * Documents du compte et des opérations souscrites.
 *
 * Chaque ligne pointe vers le fichier stocké. Tant qu'aucun stockage objet
 * n'est branché, les liens du jeu de démonstration renvoient vers un fichier
 * de placeholder servi depuis /public (voir README, section « Documents »).
 */
export function DocumentList({
  documents,
  locale,
  dict,
}: {
  documents: DocumentView[];
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <ul className="divide-y divide-hairline border-y border-hairline">
      {documents.map((document) => (
        <li key={document.id}>
          <a
            href={document.fileUrl}
            download
            className="group flex items-center gap-4 py-4 transition-colors hover:bg-white"
          >
            <FilePdf
              size={26}
              weight="light"
              className="shrink-0 text-ink-faint"
              aria-hidden="true"
            />

            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-navy">{document.title}</p>
              <p className="mt-0.5 text-[13px] text-ink-faint">
                {dict.documentType[document.type]}
                {document.dealName ? ` · ${document.dealName}` : ''}
              </p>
            </div>

            <div className="hidden shrink-0 text-right sm:block">
              <p className="tabular font-mono text-[13px] text-ink-muted">
                {formatShortDate(document.createdAt, locale)}
              </p>
              {formatBytes(document.sizeBytes, locale) ? (
                <p className="tabular font-mono text-[12px] text-ink-faint">
                  {formatBytes(document.sizeBytes, locale)}
                </p>
              ) : null}
            </div>

            <DownloadSimple
              size={19}
              weight="bold"
              className="shrink-0 text-ink-faint transition-colors group-hover:text-accent"
              aria-hidden="true"
            />
            <span className="sr-only">{dict.documents.download}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
