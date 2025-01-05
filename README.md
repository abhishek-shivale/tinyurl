# Tiny URL Project  

A feature-rich, lightweight URL shortener built with **Next.js**. This project allows users to generate shortened URLs with options for custom slugs, password protection, and more, making it ideal for personal use, businesses, or SaaS applications.  

---

## Features  
- **Shortened Links**: Quickly generate short URLs from long links.  
- **Custom Slugs**: Define personalized slugs for better readability and branding.  
- **Password Protection**: Secure your links with a password for added privacy.  
- **Click Tracking**: View the number of times your shortened links are accessed.  
- **Responsive Dashboard**: A user-friendly interface to manage and track your links.  
- **Custom Domains (Upcoming)**: Use your own domains for link branding.  
---

## Tech Stack  
- **Frontend**: Next.js  
- **Backend**: Next.js API routes  
- **Database**: Prisma with PostgreSQL  
- **Authentication**: JWT or NextAuth (customizable as needed)  
- **Styling**: Tailwind CSS  
- **Payments**: Stripe  
- **Deployment**: Vercel / Custom VPS with CloudFront  

---

## Prerequisites  
Before running this project, ensure you have the following installed:  
- Node.js (v16 or later)  
- pnpm (for dependency management)  
- PostgreSQL database  

---

## Getting Started  

### 1. Clone the Repository  
```bash  
git clone https://github.com/abhishek-shivale/tinyurl.git  
cd tinyurl 
```  

### 2. Install Dependencies  
```bash  
pnpm install  
```  

### 3. Environment Variables  
Create a `.env` file in the root directory and add the following variables:  
```env  
DATABASE_URL="postgres://postgres:mysecretpassword@localhost:5432"
# Google OAuth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Authentication
NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"
```  

### 4. Run the Development Server  
```bash  
pnpm dev  
```  
The app will be available at [http://localhost:3000](http://localhost:3000).  

---

## Deployment  

### Vercel  
1. Push your code to a GitHub/GitLab repository.  
2. Connect the repository to Vercel.  
3. Add environment variables in Vercel’s settings.  
4. Deploy the project.  

### VPS Deployment  
1. Build the project:  
   ```bash  
   pnpm build  
   ```  
2. Use a process manager like **PM2** to run the app.  
3. Configure **AWS CloudFront** for CDN and caching.  

---

## Contribution  
Contributions are welcome! If you have ideas to improve this project or want to report issues, please:  
- Fork the repository.  
- Create a new branch for your feature/fix.  
- Submit a pull request.  

---

## License  
This project is licensed under the [MIT License](LICENSE).  

---

## Acknowledgments  
- Thanks to the open-source community for tools like Next.js, Prisma, and Tailwind CSS.  
- Stripe for their robust payment gateway API.  

--- 

Feel free to modify this README based on your specific project details or additional features!
