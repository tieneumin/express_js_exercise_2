const express = require("express");
const app = express();

let parks = [
  {
    id: 1,
    name: "Yellowstone National Park",
    facilities: ["campgrounds", "visitor-center", "trails"],
  },
  {
    id: 2,
    name: "Zion National Park",
    facilities: ["trails", "visitor-center"],
  },
];

let visitors = [
  { id: 1, name: "John Doe", pastReservations: [1], upcomingReservations: [2] },
  { id: 2, name: "Jane Smith", pastReservations: [], upcomingReservations: [] },
];

let reservations = [
  { id: 1, parkId: 1, visitorId: 1, date: "2023-09-01" },
  { id: 2, parkId: 2, visitorId: 1, date: "2023-10-01" },
];

// ANSWER
app.get("/parks", (req, res) => {
  res.status(200).json(parks);
});
app.get("/parks/:id", (req, res) => {
  const park = parks.find((p) => p.id == req.params.id);
  if (park) {
    res.status(200).json(park);
  } else {
    res.status(404).json("Park not found");
  }
});

app.get("/visitors", (req, res) => {
  res.status(200).json(visitors);
});
app.get("/visitors/:id", (req, res) => {
  const visitor = visitors.find((v) => v.id == req.params.id);
  if (visitor) {
    const pastReservations = reservations.filter(
      (r) => r.id == visitor.pastReservations
    );
    const upcomingReservations = reservations.filter(
      (r) => r.id == visitor.upcomingReservations
    );
    res.status(200).json({
      ...visitor,
      pastReservations: pastReservations,
      upcomingReservations: upcomingReservations,
    });
  } else {
    res.status(404).json("Visitor not found");
  }
});

app.get("/reservations", (req, res) => {
  res.status(200).json(reservations);
});
app.get("/reservations/:id", (req, res) => {
  const reservation = reservations.find((r) => r.id == req.params.id);
  if (reservation) {
    res.status(200).json(reservation);
  } else {
    res.status(404).json("Reservation not found");
  }
});
// END OF ANSWER

app.listen(5000, () => {
  console.log("National Park Visitor System is running on port 5000");
});
