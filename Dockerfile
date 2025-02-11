# Stage 1
FROM node:18.19.0-slim as build-stage

ENV NODE_ENV production
ARG BUILD_DATE
ARG BUILD_VERSION=5.0.0
ARG BUILD_NUMBER=1

ENV BUILD_VERSION=$BUILD_VERSION
ENV BUILD_NUMBER=$BUILD_NUMBER
ENV BUILD_DATE=$BUILD_DATE

WORKDIR /app
COPY . .
RUN rm -rf /app/dist && rm -rf /app/ssl_cert_ai
RUN sed -i "s/<build_version>/$BUILD_VERSION/g" .env \
    && sed -i "s/<build_number>/$BUILD_NUMBER/g" .env \
    && sed -i "s/<build_date>/$BUILD_DATE/g" .env
RUN npm install --also=dev && npm run build

# Stage 2
FROM nginx:stable as production-stage

ARG BUILD_DATE
ARG VCSREF=0
ARG VCSREF_SHORT=0
ARG BUILD_VERSION=5.0.0
ARG BUILD_NUMBER=1

ENV BUILD_VERSION=$BUILD_VERSION
ENV BUILD_NUMBER=$BUILD_NUMBER
ENV BUILD_DATE=$BUILD_DATE

ENV VCSREF=$VCSREF
ENV VCSREF_SHORT=$VCSREF_SHORT

# Labels.
LABEL maintainer="avinash.gupta@indxtechnology.com"
LABEL org.label-schema.schema-version="1.0"
LABEL org.label-schema.build-date=$BUILD_DATE
LABEL org.label-schema.name="icorev5/ilims-frontend-standalone"
LABEL org.label-schema.description="iCorev5 iLims Frontend as Standalone"
LABEL org.label-schema.url="http://indx.ai/"
LABEL org.label-schema.vcs-url="https://bitbucket.org/indxtechnology/ilims-ui"
LABEL org.label-schema.vcs-ref=$VCSREF
LABEL org.label-schema.vcs-ref-short=$VCSREF_SHORT
LABEL org.label-schema.version=$BUILD_VERSION
LABEL org.label-schema.build=$BUILD_NUMBER
LABEL org.label-schema.docker.cmd=""
COPY build-scripts/entrypoint.sh /usr/local/bin/
COPY build-scripts/wait-for.sh /usr/local/bin/
RUN chmod a+x /usr/local/bin/entrypoint.sh && ln -s /usr/local/bin/entrypoint.sh / # backwards compat
RUN chmod a+x /usr/local/bin/wait-for.sh && ln -s /usr/local/bin/wait-for.sh / # backwards compat
RUN apt-get update && apt-get install netcat-traditional -y
RUN mkdir -p /app/dist /usr/share/nginx/html/ilims
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html/ilims
EXPOSE 80
EXPOSE 443
ENTRYPOINT ["/entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]