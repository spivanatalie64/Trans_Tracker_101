export type SourceCategory = 'LGBTQ+ News' | 'Legal & Advocacy' | 'State Independent News' | 'General Politics';

export interface RssSource {
  id: string;
  name: string;
  url: string;
  category: SourceCategory;
  website: string;
}

export const sources: RssSource[] = [
  // 1. LGBTQ+ News (12)
  { id: 'advocate', name: 'The Advocate', url: 'https://www.advocate.com/politics/feed', category: 'LGBTQ+ News', website: 'https://www.advocate.com' },
  { id: 'pinknews', name: 'PinkNews', url: 'https://www.thepinknews.com/feed/', category: 'LGBTQ+ News', website: 'https://www.thepinknews.com' },
  { id: 'them', name: 'Them', url: 'https://www.them.us/feed/rss', category: 'LGBTQ+ News', website: 'https://www.them.us' },
  { id: 'washingtonblade', name: 'Washington Blade', url: 'https://www.washingtonblade.com/feed/', category: 'LGBTQ+ News', website: 'https://washingtonblade.com' },
  { id: 'lgbtqnation', name: 'LGBTQ Nation', url: 'https://www.lgbtqnation.com/feed/', category: 'LGBTQ+ News', website: 'https://www.lgbtqnation.com' },
  { id: 'erininthemorn', name: 'Erin In The Morning', url: 'https://www.erininthemorning.com/feed', category: 'LGBTQ+ News', website: 'https://www.erininthemorning.com' },
  { id: 'assignedmedia', name: 'Assigned Media', url: 'https://www.assignedmedia.org/feed', category: 'LGBTQ+ News', website: 'https://www.assignedmedia.org' },
  { id: 'autostraddle', name: 'Autostraddle', url: 'https://www.autostraddle.com/feed/', category: 'LGBTQ+ News', website: 'https://www.autostraddle.com' },
  { id: 'pridesource', name: 'Pride Source', url: 'https://pridesource.com/feed/', category: 'LGBTQ+ News', website: 'https://pridesource.com' },
  { id: 'dallasvoice', name: 'Dallas Voice', url: 'https://dallasvoice.com/feed/', category: 'LGBTQ+ News', website: 'https://dallasvoice.com' },
  { id: 'metroweekly', name: 'Metro Weekly', url: 'https://www.metroweekly.com/feed/', category: 'LGBTQ+ News', website: 'https://www.metroweekly.com' },
  { id: 'bayareareporter', name: 'Bay Area Reporter', url: 'https://www.ebar.com/feed/rss/news', category: 'LGBTQ+ News', website: 'https://www.ebar.com' },

  // 2. Legal & Advocacy (8)
  { id: 'aclu', name: 'ACLU Press Releases', url: 'https://www.aclu.org/press-releases/rss', category: 'Legal & Advocacy', website: 'https://www.aclu.org' },
  { id: 'hrc', name: 'Human Rights Campaign', url: 'https://www.hrc.org/press-releases/rss', category: 'Legal & Advocacy', website: 'https://www.hrc.org' },
  { id: 'tlc', name: 'Transgender Law Center', url: 'https://transgenderlawcenter.org/feed/', category: 'Legal & Advocacy', website: 'https://transgenderlawcenter.org' },
  { id: 'lambdalegal', name: 'Lambda Legal', url: 'https://www.lambdalegal.org/blog/rss', category: 'Legal & Advocacy', website: 'https://lambdalegal.org' },
  { id: 'nclr', name: 'NCLR', url: 'https://www.nclrights.org/feed/', category: 'Legal & Advocacy', website: 'https://www.nclrights.org' },
  { id: 'glad', name: 'GLAD', url: 'https://www.glad.org/feed/', category: 'Legal & Advocacy', website: 'https://www.glad.org' },
  { id: 'equalityfed', name: 'Equality Federation', url: 'https://www.equalityfederation.org/blog/rss.xml', category: 'Legal & Advocacy', website: 'https://www.equalityfederation.org' },
  { id: 'a4te', name: 'Advocates for Trans Equality', url: 'https://transequality.org/rss.xml', category: 'Legal & Advocacy', website: 'https://transequality.org' },

  // 3. State Independent News (States Newsroom - Battlegrounds) (20)
  { id: 'texastribune', name: 'Texas Tribune', url: 'https://www.texastribune.org/feeds/main/', category: 'State Independent News', website: 'https://www.texastribune.org' },
  { id: 'floridaphoenix', name: 'Florida Phoenix', url: 'https://floridaphoenix.com/feed/', category: 'State Independent News', website: 'https://floridaphoenix.com' },
  { id: 'tnlookout', name: 'Tennessee Lookout', url: 'https://tennesseelookout.com/feed/', category: 'State Independent News', website: 'https://tennesseelookout.com' },
  { id: 'moindependent', name: 'Missouri Independent', url: 'https://missouriindependent.com/feed/', category: 'State Independent News', website: 'https://missouriindependent.com' },
  { id: 'ohcapitaljournal', name: 'Ohio Capital Journal', url: 'https://ohiocapitaljournal.com/feed/', category: 'State Independent News', website: 'https://ohiocapitaljournal.com' },
  { id: 'idahocapitalsun', name: 'Idaho Capital Sun', url: 'https://idahocapitalsun.com/feed/', category: 'State Independent News', website: 'https://idahocapitalsun.com' },
  { id: 'dailymontanan', name: 'Daily Montanan', url: 'https://dailymontanan.com/feed/', category: 'State Independent News', website: 'https://dailymontanan.com' },
  { id: 'utahnewsdispatch', name: 'Utah News Dispatch', url: 'https://utahnewsdispatch.com/feed/', category: 'State Independent News', website: 'https://utahnewsdispatch.com' },
  { id: 'iowacapitaldispatch', name: 'Iowa Capital Dispatch', url: 'https://iowacapitaldispatch.com/feed/', category: 'State Independent News', website: 'https://iowacapitaldispatch.com' },
  { id: 'kansasreflector', name: 'Kansas Reflector', url: 'https://kansasreflector.com/feed/', category: 'State Independent News', website: 'https://kansasreflector.com' },
  { id: 'kentuckylantern', name: 'Kentucky Lantern', url: 'https://kentuckylantern.com/feed/', category: 'State Independent News', website: 'https://kentuckylantern.com' },
  { id: 'arkansasadvocate', name: 'Arkansas Advocate', url: 'https://arkansasadvocate.com/feed/', category: 'State Independent News', website: 'https://arkansasadvocate.com' },
  { id: 'oklahomavoice', name: 'Oklahoma Voice', url: 'https://oklahomavoice.com/feed/', category: 'State Independent News', website: 'https://oklahomavoice.com' },
  { id: 'southdakotasearchlight', name: 'South Dakota Searchlight', url: 'https://southdakotasearchlight.com/feed/', category: 'State Independent News', website: 'https://southdakotasearchlight.com' },
  { id: 'nebraskaexaminer', name: 'Nebraska Examiner', url: 'https://nebraskaexaminer.com/feed/', category: 'State Independent News', website: 'https://nebraskaexaminer.com' },
  { id: 'ncnewsline', name: 'NC Newsline', url: 'https://ncnewsline.com/feed/', category: 'State Independent News', website: 'https://ncnewsline.com' },
  { id: 'virginiamercury', name: 'Virginia Mercury', url: 'https://virginiamercury.com/feed/', category: 'State Independent News', website: 'https://virginiamercury.com' },
  { id: 'michiganadvance', name: 'Michigan Advance', url: 'https://michiganadvance.com/feed/', category: 'State Independent News', website: 'https://michiganadvance.com' },
  { id: 'wisconsinexaminer', name: 'Wisconsin Examiner', url: 'https://wisconsinexaminer.com/feed/', category: 'State Independent News', website: 'https://wisconsinexaminer.com' },
  { id: 'indianacapitalchronicle', name: 'Indiana Capital Chronicle', url: 'https://indianacapitalchronicle.com/feed/', category: 'State Independent News', website: 'https://indianacapitalchronicle.com' },

  // 4. General Politics & Mainstream (10)
  { id: 'politico', name: 'Politico Congress', url: 'https://rss.politico.com/congress.xml', category: 'General Politics', website: 'https://www.politico.com' },
  { id: 'thehill', name: 'The Hill', url: 'https://thehill.com/homenews/feed/', category: 'General Politics', website: 'https://thehill.com' },
  { id: 'propublica', name: 'ProPublica', url: 'https://www.propublica.org/feeds/propublica/main', category: 'General Politics', website: 'https://www.propublica.org' },
  { id: 'npr', name: 'NPR Politics', url: 'https://feeds.npr.org/1014/rss.xml', category: 'General Politics', website: 'https://www.npr.org' },
  { id: 'pbs', name: 'PBS NewsHour', url: 'https://www.pbs.org/newshour/feeds/rss/politics', category: 'General Politics', website: 'https://www.pbs.org/newshour' },
  { id: 'rollcall', name: 'Roll Call', url: 'https://rollcall.com/feed/', category: 'General Politics', website: 'https://rollcall.com' },
  { id: 'lawdork', name: 'Law Dork', url: 'https://www.lawdork.com/feed', category: 'General Politics', website: 'https://www.lawdork.com' },
  { id: 'thepresentage', name: 'The Present Age', url: 'https://www.thepresentage.com/feed', category: 'General Politics', website: 'https://www.thepresentage.com' },
  { id: 'motherjones', name: 'Mother Jones', url: 'https://www.motherjones.com/politics/feed/', category: 'General Politics', website: 'https://www.motherjones.com' },
  { id: 'salon', name: 'Salon Politics', url: 'https://www.salon.com/category/politics/feed', category: 'General Politics', website: 'https://www.salon.com' }
];
