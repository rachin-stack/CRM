export function renderPropertyShareMessage(leadName: string, propertyTitle: string, location: string, price: number, shareLink: string) {
  return `Hi ${leadName}, sharing details of ${propertyTitle} in ${location}. Price: ₹${price}. Photos and details: ${shareLink}`;
}
