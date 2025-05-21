# marketplace/Frontend/Dockerfile
FROM node:20-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Set production environment variables during build time
ARG VITE_API_URL
ARG VITE_STRIPE_PUBLISHABLE_KEY
ARG VITE_PUBLIC_POSTHOG_KEY
ARG VITE_PUBLIC_POSTHOG_HOST

ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_STRIPE_PUBLISHABLE_KEY=${VITE_STRIPE_PUBLISHABLE_KEY}
ENV VITE_PUBLIC_POSTHOG_KEY=${VITE_PUBLIC_POSTHOG_KEY}
ENV VITE_PUBLIC_POSTHOG_HOST=${VITE_PUBLIC_POSTHOG_HOST}

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]