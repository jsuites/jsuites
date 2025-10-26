FROM public.ecr.aws/x8v8d7g8/mars-base:latest

WORKDIR /app

COPY package*.json ./

ENV NODE_ENV=development
RUN npm ci --prefer-offline --no-audit --no-fund

COPY . .

RUN npm run build

CMD ["/bin/bash"]
