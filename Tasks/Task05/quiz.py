
import random
import requests
import time

print("WELCOME!")

cat=input("Enter category ID:")
difficulty=input("Enter difficulty (easy,medium,difficult):")
type=input("Enter type (multiple,(true/False)):")

url=f"https://opentdb.com/api.php?amount=10&category={cat}&difficulty={difficulty}&type={type}"
Q=requests.get(url).json()

score=0
qn=1
for i in Q['results']:
    print(f"q{qn}:{i['question']}")
    ans=[i['correct_answer']]+i['incorrect_answers']
    random.shuffle(ans)

    for j in range(len(ans)):
        print(f"   {j+1}. {ans[j]}")
        
    start=time.time()
    answer=input("Enter your answer:")
    end=time.time()
        
    if end-start>15:
        print("Time's up!")
    elif ans[int(answer)-1] == i['correct_answer']:
        print("Correct!")
        score += 1
    else:
        print(f"Wrong! The correct answer was: {i['correct_answer']}")
    qn += 1
print(f"Game over! \n Your final score is: {score}/{len(Q['results'])}")
