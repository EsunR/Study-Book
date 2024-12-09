"""import data"""

import json
import pdfplumber

questions = json.load(open("./assets/questions.json", encoding="utf-8"))
print(questions[0])

pdf = pdfplumber.open("./assets/初赛训练数据集.pdf")
print(f"pdf 共有 {len(pdf.pages)} 页")

pdf_content = []
for i, page in enumerate(pdf.pages):
    pdf_content.append({
        'page': 'page_' + str(i + 1),
        'content': pdf.pages[i].extract_text()
    })

print(pdf_content[0])
