import { sql } from '../../init/db';

export default async function handler(req, res) {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  const formattedToday = today.toISOString().split("T")[0];

  try {
    await sql`
      UPDATE Tournaments 
      SET Status = 'Ongoing' 
      WHERE CAST(Date AS DATE) = ${formattedToday} AND Status = 'Upcoming'
    `;

    await sql`
      UPDATE Tournaments 
      SET Status = 'Completed' 
      WHERE CAST(Date AS DATE) < ${formattedToday} AND Status != 'Completed'
    `;

    res.status(200).json({ message: 'Tournament statuses updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update tournaments' });
  }
}
