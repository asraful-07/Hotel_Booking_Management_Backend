Auth → ✅ Login/Register/Session
ExtraService → ✅ Create/Get/Update/Delete
RoomType → ✅ CRUD
Room → ✅ CRUD
Reservation → ✅ CRUD
Checkin → ✅ CRUD
Review → ✅ CRUD
Wishlist → ✅ CRUD
Payment → ✅ CRUD
stats → Pending
users → Pending

## E-commerce → Hotel System

Cart → Selected Room + Services
Checkout → Reservation
Payment → Payment
Order → Reservation
Order Tracking → Reservation + Checkin
Delivery → Stay
Order Complete → Checkout

Reservation তৈরি
↓
Payment Done
↓
Reservation = CONFIRMED
↓
Customer Hotel এ আসে
↓
🔥 Checkin API call
↓
Checkin Table এ data save

<!-- * -->

Reservation তৈরি
Payment করলি
Hotel এ গেলে → Checkin
২ দিন থাকলি
চলে গেলি → Checkout
