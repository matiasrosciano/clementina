const fmt = new Intl.DateTimeFormat('es-AR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'America/Argentina/Buenos_Aires',
})

export function formatDateAR(date) {
  return fmt.format(typeof date === 'string' ? new Date(date) : date)
}
