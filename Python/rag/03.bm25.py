import json
import pdfplumber
import jieba
from rank_bm25 import BM25Okapi

questions = json.load(open("./assets/questions.json", encoding="utf-8"))
pdf = pdfplumber.open("./assets/初赛训练数据集.pdf")

pdf_content = []
for i, page in enumerate(pdf.pages):
    pdf_content.append({
        'page': 'page_' + str(i + 1),
        'content': pdf.pages[i].extract_text()
    })

pdf_content_words = [jieba.lcut(x['content']) for x in pdf_content]
bm25 = BM25Okapi(pdf_content_words)

for i, question in enumerate(questions):
    # 获取与目标问题与所有文档的相似度
    doc_scores = bm25.get_scores(jieba.lcut(question['question']))
    # 获取最大相似度的文档索引
    max_score_page_idx = doc_scores.argsort()[-1] + 1
    question['reference'] = 'page_' + str(max_score_page_idx)

with open('./output/bm25-result.json', 'w', encoding='utf8') as up:
    json.dump(questions, up, ensure_ascii=False, indent=4)
