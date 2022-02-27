import sqlite3


conn = sqlite3.connect('blocks.db')
cur = conn.cursor()

cur.execute("""DROP TABLE IF EXISTS block""")
sql_query = """ CREATE TABLE block (
    id integer PRIMARY KEY,
    prank integer NOT NULL,
    caller integer NOT NULL
)"""

cur.execute(sql_query)
x,y = 1,2
conn.commit()
cur.execute("INSERT INTO block VALUES (?,?,?)", (0,x,y))
conn.commit()