import sys
import os
from logging.config import fileConfig

from sqlalchemy import pool, create_engine

from alembic import context

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.db.base import Base
from app.db.session import DATABASE_URL

import app.models

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata


def run_migrations_offline() -> None:
    url = DATABASE_URL
    if "mysql" in url:
      url = url.replace("mysql+aiomysql", "mysql+pymysql")
    elif "sqlite" in url:
      url = url.replace("sqlite+aiosqlite", "sqlite")

    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    url = DATABASE_URL
    if "mysql" in url:
      url = url.replace("mysql+aiomysql", "mysql+pymysql")
    elif "sqlite" in url:
      url = url.replace("sqlite+aiosqlite", "sqlite")

    connectable = create_engine(url, poolclass=pool.NullPool)

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
