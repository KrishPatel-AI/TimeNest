1.Command to Run:-
cd /frontend/
npm install
npm run dev

2.Repo Structure 
backend 
database
frontend 
 -src
 -app

 3.Summary of Code
- Project Name
TimeNest 

- Tagline
A secure and interactive way to preserve and unlock cherished messages over time.

- The problem it solves
In today's fast-paced digital world, memories are scattered across multiple platforms—social media, cloud storage, and local devices—leading to fragmented and unorganized digital heritage.
Eternal Moments provides a centralized, secure, and engaging solution for users to:
Store and time-lock .
Share memory capsules with friends, families, or communities.
Celebrate milestones by unlocking memories on special dates.
Whether it's a future birthday message, a love letter, or a time capsule for future generations, this platform enables users to experience time-traveling nostalgia.


- Challenges we ran into
We needed a flexible way for users to manually input or select a date and time in 12-hour format (AM/PM) while ensuring correctness.
We overcame this by integrating a calendar component with synchronized manual input and time selection.
Countdown Timer Accuracy

Ensuring the real-time countdown updates dynamically and remains consistent across time zones.
We achieved this with precise time calculations and state updates using React’s useEffect and setInterval.
Secure & Scalable File Uploads
Handling media storage securely while maintaining accessibility.
Implemented a structured backend API to store files with an option for Firebase.



- Technologies we used
Next.js, TypeScript, ShadCN UI, Firebase, Node.js, Tailwind CSS

