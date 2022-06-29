FROM node:16-slim as build


WORKDIR /usr/src/OsInBrowser
COPY . .




# Update default packages
RUN apt-get update

# Get Ubuntu packages
RUN apt-get install -y \
    build-essential \
    curl



# Update new packages
RUN apt-get update

# Get Rust
RUN curl https://sh.rustup.rs -sSf | bash -s -- -y

# Add .cargo/bin to PATH
ENV PATH="/root/.cargo/bin:${PATH}"

# Check cargo is visible
RUN cargo --help

RUN cd os_in_browser &&  npm i 
RUN cd os_in_browser && npm run build 
RUN cargo build --release

ENV SENTRY_DISABLED=true
ENV HOST 0.0.0.0

EXPOSE 3000

FROM gcr.io/distroless/cc-debian10

COPY --from=build /usr/src/OsInBrowser/target/release/backend /usr/local/bin/backend
COPY --from=build /usr/src/OsInBrowser/os_in_browser/dist /usr/local/bin/dist

WORKDIR /usr/local/bin

CMD ["backend"]
