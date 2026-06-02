import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.studyhubpro.in";
const DEFAULT_DESCRIPTION =
  "Premium VTU engineering notes, question banks, lab manuals and study materials for all branches and semesters. Free access to 1000+ curated resources.";

interface SEOProps {
  title: string;
  description?: string;
  path?: string;
  type?: "website" | "article";
}

export function SEO({ title, description = DEFAULT_DESCRIPTION, path = "/", type = "website" }: SEOProps) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title.length > 60 ? title : `${title} | StudyHub`;
  const desc = description.length > 160 ? description.slice(0, 157) + "..." : description;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
    </Helmet>
  );
}
