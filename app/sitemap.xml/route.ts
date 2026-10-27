import { indexXml, xmlResponse } from '@/lib/sitemaps';

export const dynamic = 'force-static';

export const GET = () => xmlResponse(indexXml());
