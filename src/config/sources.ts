export type SourceCategory = 'LGBTQ+ News' | 'Legal & Advocacy' | 'State Independent News' | 'General Politics';

export interface RssSource {
  id: string;
  name: string;
  url: string;
  category: SourceCategory;
  website: string;
}

export const sources: RssSource[] = [
  // LGBTQ+ News
  { id: 'advocate', name: 'The Advocate', url: 'https://www.advocate.com/politics/feed', category: 'LGBTQ+ News', website: 'https://www.advocate.com' },
  { id: 'pinknews', name: 'PinkNews', url: 'https://www.thepinknews.com/feed/', category: 'LGBTQ+ News', website: 'https://www.thepinknews.com' },
  { id: 'them', name: 'Them', url: 'https://www.them.us/feed/rss', category: 'LGBTQ+ News', website: 'https://www.them.us' },
  { id: 'washingtonblade', name: 'Washington Blade', url: 'https://www.washingtonblade.com/feed/', category: 'LGBTQ+ News', website: 'https://washingtonblade.com' },
  { id: 'lgbtqnation', name: 'LGBTQ Nation', url: 'https://www.lgbtqnation.com/feed/', category: 'LGBTQ+ News', website: 'https://www.lgbtqnation.com' },
  { id: 'erininthemorn', name: 'Erin In The Morning', url: 'https://www.erininthemorning.com/feed', category: 'LGBTQ+ News', website: 'https://www.erininthemorning.com' },
  { id: 'assignedmedia', name: 'Assigned Media', url: 'https://www.assignedmedia.org/feed', category: 'LGBTQ+ News', website: 'https://www.assignedmedia.org' },
  
  // Legal & Advocacy
  { id: 'aclu', name: 'ACLU Press Releases', url: 'https://www.aclu.org/press-releases/rss', category: 'Legal & Advocacy', website: 'https://www.aclu.org' },
  { id: 'hrc', name: 'Human Rights Campaign', url: 'https://www.hrc.org/press-releases/rss', category: 'Legal & Advocacy', website: 'https://www.hrc.org' },
  { id: 'tlc', name: 'Transgender Law Center', url: 'https://transgenderlawcenter.org/feed/', category: 'Legal & Advocacy', website: 'https://transgenderlawcenter.org' },
  
  // State Independent News (States Newsroom)
  { id: 'texastribune', name: 'Texas Tribune', url: 'https://www.texastribune.org/feeds/main/', category: 'State Independent News', website: 'https://www.texastribune.org' },
  { id: 'floridaphoenix', name: 'Florida Phoenix', url: 'https://floridaphoenix.com/feed/', category: 'State Independent News', website: 'https://floridaphoenix.com' },
  { id: 'tnlookout', name: 'Tennessee Lookout', url: 'https://tennesseelookout.com/feed/', category: 'State Independent News', website: 'https://tennesseelookout.com' },
  { id: 'moindependent', name: 'Missouri Independent', url: 'https://missouriindependent.com/feed/', category: 'State Independent News', website: 'https://missouriindependent.com' },
  { id: 'ohcapitaljournal', name: 'Ohio Capital Journal', url: 'https://ohiocapitaljournal.com/feed/', category: 'State Independent News', website: 'https://ohiocapitaljournal.com' },
  { id: 'idahocapitalsun', name: 'Idaho Capital Sun', url: 'https://idahocapitalsun.com/feed/', category: 'State Independent News', website: 'https://idahocapitalsun.com' },
  
  // General Politics
  { id: 'politico', name: 'Politico Congress', url: 'https://rss.politico.com/congress.xml', category: 'General Politics', website: 'https://www.politico.com' },
  { id: 'thehill', name: 'The Hill', url: 'https://thehill.com/homenews/feed/', category: 'General Politics', website: 'https://thehill.com' },
  { id: 'propublica', name: 'ProPublica', url: 'https://www.propublica.org/feeds/propublica/main', category: 'General Politics', website: 'https://www.propublica.org' },
];
