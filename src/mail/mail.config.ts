export default function MailLayout(activationLink: string): string {
  return `
  <div href="${activationLink}">${activationLink}</div>
  `;
}