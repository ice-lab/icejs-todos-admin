drop database if exists icejs_todos;
drop user if exists 'icejs_todos'@'%';
create database icejs_todos default character set utf8mb4 collate utf8mb4_unicode_ci;
use icejs_todos;
create user 'icejs_todos'@'%' identified by 'icejs_todos';
grant all privileges on icejs_todos.* to 'icejs_todos'@'%';
flush privileges;