import jieba
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import normalize
import json
import pdfplumber

questions = json.load(open("./assets/questions.json", encoding="utf-8"))
pdf = pdfplumber.open("./assets/初赛训练数据集.pdf")

pdf_content = []
for i, page in enumerate(pdf.pages):
    pdf_content.append({
        'page': 'page_' + str(i + 1),
        'content': pdf.pages[i].extract_text()
    })

question_words = [' '.join(jieba.lcut(x['question'])) for x in questions]
pdf_content_words = [' '.join(jieba.lcut(x['content'])) for x in pdf_content]

tfidf = TfidfVectorizer()
tfidf.fit(question_words + pdf_content_words)

# 提取 TF-IDF
question_feat = tfidf.transform(question_words)
pdf_content_feat = tfidf.transform(pdf_content_words)

# 归一化
question_feat = normalize(question_feat)
pdf_content_feat = normalize(pdf_content_feat)

# 检索进行排序
for query_idx, feat in enumerate(question_feat):
    # 计算问题和文档之间的余弦相似度
    score = feat @ pdf_content_feat.T
    # 获取得分最高的段落
    score = score.toarray()[0]
    max_score_page_idx = score.argsort()[-1] + 1
    questions[query_idx]['reference'] = 'page_' + str(max_score_page_idx)

# 生成提交结果
# https://competition.coggle.club/
with open('./output/tfidf-result.json', 'w', encoding='utf8') as up:
    json.dump(questions, up, ensure_ascii=False, indent=4)
