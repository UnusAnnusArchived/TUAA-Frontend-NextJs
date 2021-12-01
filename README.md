# The Unus Annus Archive Frontend

## Getting Started

```bash
git clone https://github.com/UnusAnnusArchived/TUAA-Frontend-NextJs

cd TUAA-Frontend-NextJs

yarn install

yarn dev
```

Open <http://localhost:3000> with your browser to see the archive.

## Using a local backend
To use a local backend instead of <https://api.unusann.us>, run the following in the console, then start both the [backend](https://github.com/UnusAnnusArchived/TUAA-Backend) and frontend.
```bash
# Linux
export localApiPort=1024 # API URI will now be http://localhost:1024
```
```bat
@rem Windows
set localApiPort=1024
@rem API URI will now be https://localhost:1024
```
You can also set the export to a different port if you have the backend setup differently.