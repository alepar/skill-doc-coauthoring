"""sync: copy a directory tree to a remote bucket."""
import argparse

MAX_RETRIES = 5


def main(argv=None):
    p = argparse.ArgumentParser(prog="sync")
    p.add_argument("src")
    p.add_argument("dest")
    p.add_argument("--preview", action="store_true", help="print the planned uploads without writing")
    p.add_argument("--jobs", type=int, default=4, help="parallel uploads (default 4)")
    args = p.parse_args(argv)
    ...


if __name__ == "__main__":
    main()
