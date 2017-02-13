// @flow

export default (entries: Array) => entries.map((entry, i) => ({
  id: entry.id.attributes['im:id'],
  name: entry['im:name'].label,
  image: entry['im:image'][2].label,
  category: entry.category.attributes.label,
  link: entry.link.attributes.href,
  summary: entry.summary.label,
  author: entry['im:artist'].label,
  rating: entry.rating,
  ratingCount: (entry.ratingCount*1).toLocaleString()
}))