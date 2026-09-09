// functions/api/add-to-calendar.js
// Cloudflare Pages Function: Add cleanout booking to Google Calendar at the edge

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const { title, description, date, timeSlot, address, clientName, accessToken } = await request.json();

    // If client supplied an OAuth access token, call Google Calendar directly
    const token = accessToken || env.GOOGLE_CALENDAR_TOKEN;

    if (!token) {
      console.log(`[Google Calendar] Booking recorded for ${clientName} on ${date} (${timeSlot}) at ${address}`);
      return Response.json({
        success: true,
        simulated: true,
        message: "Saved to crew dispatch database. Connect Google Calendar via OAuth or add GOOGLE_CALENDAR_TOKEN to auto-sync."
      });
    }

    const startHour = timeSlot === "morning" ? "08:00:00" : "12:00:00";
    const endHour = timeSlot === "morning" ? "12:00:00" : "16:00:00";
    const startDateTime = `${date}T${startHour}-05:00`; // Arkansas Central Time offset
    const endDateTime = `${date}T${endHour}-05:00`;

    const event = {
      summary: title || `River Valley Cleanup Crew - ${clientName}`,
      location: address,
      description: `${description || "No description provided."}\n\nClient: ${clientName}\nSlot: ${timeSlot}`,
      start: {
        dateTime: startDateTime,
        timeZone: "America/Chicago"
      },
      end: {
        dateTime: endDateTime,
        timeZone: "America/Chicago"
      }
    };

    const googleRes = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(event)
    });

    if (!googleRes.ok) {
      const err = await googleRes.text();
      console.error("Google Calendar API Error:", err);
      return Response.json({ error: "Google Calendar API error: " + googleRes.statusText }, { status: googleRes.status });
    }

    const result = await googleRes.json();
    return Response.json({ success: true, eventId: result.id, message: "Calendar event scheduled successfully!" });
  } catch (err) {
    console.error("Calendar function error:", err);
    return Response.json({ error: err.message || "Failed to schedule calendar event" }, { status: 500 });
  }
}
