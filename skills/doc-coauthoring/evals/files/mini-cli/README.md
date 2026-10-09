# sync

`sync` copies a directory tree to a remote bucket.

Run `python sync.py ./site s3://my-bucket --dry-run` to see what would be uploaded without writing anything.

Uploads run 8 at a time by default; change that with `--jobs`. A failed upload is retried 3 times before `sync` gives up.

We chose argparse over click to keep the tool dependency-free.
