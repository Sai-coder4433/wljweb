<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
    xmlns:html="http://www.w3.org/TR/REC-html40"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  
  <xsl:template match="/">
    <html lang="en">
      <head>
        <title>XML Sitemap | Wafgaonkar Laxmi Jewellers</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="/polished_gold_knot_emblem.png" />
        <style type="text/css">
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            background-color: #F3F0EA;
            color: #29231F;
            padding: 30px 20px;
            line-height: 1.5;
          }
          .container {
            max-width: 1080px;
            margin: 0 auto;
            background: #FAF8F4;
            border: 1px solid #D7B95F;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 30px -5px rgba(60, 0, 21, 0.08);
          }
          .header {
            background: #3C0015;
            color: #FAF8F4;
            padding: 28px 32px;
            border-bottom: 2px solid #D7B95F;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 16px;
          }
          .brand-title {
            font-size: 20px;
            font-weight: 700;
            color: #FAF8F4;
            letter-spacing: -0.01em;
          }
          .brand-sub {
            font-size: 11px;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: #E0C068;
            font-weight: 600;
            margin-top: 4px;
          }
          .badge {
            background: rgba(215, 185, 95, 0.15);
            border: 1px solid #D7B95F;
            color: #E0C068;
            padding: 6px 14px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 600;
          }
          .intro {
            padding: 24px 32px;
            background: #FFFFFF;
            border-bottom: 1px solid #E5DFD5;
          }
          .intro h2 {
            font-size: 16px;
            font-weight: 700;
            color: #3C0015;
            margin-bottom: 6px;
          }
          .intro p {
            font-size: 13px;
            color: #766A61;
          }
          .intro a {
            color: #8B2131;
            text-decoration: underline;
            font-weight: 600;
          }
          .table-wrapper {
            overflow-x: auto;
            padding: 16px 24px 24px 24px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
          }
          th {
            background: #F3F0EA;
            color: #3C0015;
            text-align: left;
            padding: 12px 14px;
            font-weight: 700;
            border-bottom: 2px solid #D7B95F;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
          }
          td {
            padding: 12px 14px;
            border-bottom: 1px solid #EADBCE;
            vertical-align: middle;
          }
          tr:hover td {
            background-color: #F8F5EE;
          }
          .url-link {
            color: #3C0015;
            text-decoration: none;
            font-weight: 600;
            word-break: break-all;
          }
          .url-link:hover {
            color: #8B2131;
            text-decoration: underline;
          }
          .tag-priority {
            display: inline-block;
            padding: 2px 8px;
            background: #FAF0D8;
            color: #7A5812;
            border: 1px solid #E5CCA0;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 700;
          }
          .footer-note {
            padding: 18px 32px;
            background: #FAF8F4;
            border-top: 1px solid #E5DFD5;
            font-size: 11px;
            color: #766A61;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <div>
              <div class="brand-title">वाफगांवकर लक्ष्मी ज्वेलर्स — XML Sitemap</div>
              <div class="brand-sub">Wafgaonkar Laxmi Jewellers • Chakan, Pune • Since 1951</div>
            </div>
            <div class="badge">
              <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs Indexed
            </div>
          </div>

          <!-- Description -->
          <div class="intro">
            <h2>Official Production XML Sitemap</h2>
            <p>
              This sitemap is generated for Google Search Console and search engine crawlers indexing 
              <a href="https://wafgaonkarlaxmijewellers.com/">wafgaonkarlaxmijewellers.com</a>.
              It lists canonical, public, and mobile-friendly pages for the showroom in Chakan, Maharashtra.
            </p>
          </div>

          <!-- URLs Table -->
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style="width: 5%;">#</th>
                  <th style="width: 55%;">URL</th>
                  <th style="width: 12%;">Priority</th>
                  <th style="width: 13%;">Changefreq</th>
                  <th style="width: 15%;">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td style="color: #766A61; font-weight: 600;">
                      <xsl:value-of select="position()"/>
                    </td>
                    <td>
                      <a class="url-link" href="{sitemap:loc}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <span class="tag-priority">
                        <xsl:value-of select="sitemap:priority"/>
                      </span>
                    </td>
                    <td style="color: #5A4D41; text-transform: capitalize;">
                      <xsl:value-of select="sitemap:changefreq"/>
                    </td>
                    <td style="color: #766A61; font-family: monospace; font-size: 11px;">
                      <xsl:value-of select="sitemap:lastmod"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <!-- Footer Note -->
          <div class="footer-note">
            <span>© 1951–2026 Wafgaonkar Laxmi Jewellers. All rights reserved.</span>
            <span>Robots: Allowed • Schema: JewelryStore</span>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
