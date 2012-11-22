import csv
with open('stops.txt', 'rb') as csvfile:
    content = []
    reader = csv.reader(csvfile)
    for row in reader:
        content.append('[{0},{1}]'.format(row[4], row[5]))
    print '[' + ','.join(content) + ']'
