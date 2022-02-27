import json
import os
import hashlib
from datetime import date, datetime

today = date.today()
now = datetime.now()


BLOCKCHAIN_DIR =  'BlockChain/'




def get_hash(prev_block):
    with open(BLOCKCHAIN_DIR + prev_block, 'rb') as f:
        content = f.read()
    return hashlib.md5(content).hexdigest()


def check_integrity():
    files = sorted(os.listdir(BLOCKCHAIN_DIR), key=lambda x: int(x))
    # print(files)

    results = []


    for file in files[1:]:
        with open(BLOCKCHAIN_DIR + file) as f:
            block = json.load(f)

        prev_hash = block.get('prev_block').get('hash')
        prev_filename = block.get('prev_block').get('filename')

        actual_hash = get_hash(prev_filename)

        if(prev_hash == actual_hash):
            res = 'OK'
        else:
            res = 'Was Changed'

        print(f'Block {prev_filename}: {res}')
        results.append({'block': prev_filename, 'result': res})
    return results


def search_prank_blocks():
    files = sorted(os.listdir(BLOCKCHAIN_DIR), key=lambda x: int(x))
    # print(files)

    results = []


    for file in files[1:]:
        with open(BLOCKCHAIN_DIR + file) as f:
            block = json.load(f)

        print(block.get('prev_block').get('hash'))    
        prev_hash = block.get('prev_block').get('hash')
        prev_filename = block.get('prev_block').get('filename')

        actual_hash = get_hash(prev_filename)

        if(prev_hash == actual_hash):
            res = 'OK'
        else:
            res = 'Was Changed'

        print(f'Block {prev_filename}: {res}')
        results.append({'block': prev_filename, 'result': res})
    return results



def write_block(phoneNo, audiodata, Result, isPrank=0):

    # print(Result)

    current_time = now.strftime("%H:%M:%S")
    d3 = today.strftime("%m/%d/%y")

    blocks_count = len(os.listdir(BLOCKCHAIN_DIR))
    prev_block = str(blocks_count)

    data = {
      "callerid":  phoneNo,
      "TextData" : audiodata,
      "date" : d3,
      "time" : current_time,
      "isPrank": isPrank,
      "Result_analysis" : {
        "Angry" : Result['Angry'],
        "Fear" : Result['Fear'],
        "Happy" : Result['Happy'],
        "Sad" : Result['Sad'],
        "Surprise": Result['Surprise']
      },
      "prev_block": {
         "hash": get_hash(prev_block),
         "filename": prev_block
       }
    }

    current_block = BLOCKCHAIN_DIR + str(blocks_count + 1)

    with open(current_block, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
        f.write('\n')




def main():
    #write_block(phoneNo = "99999", audiodata = "gauarav", Result = {"Angry": 0.0, "Fear": 0.5, "Happy": 0.0, "Sad": 0.0, "Surprise": 0.5}, isPrank = "NO")
    check_integrity()
    #print(search_prank_blocks())



if __name__ == '__main__':
    main()
