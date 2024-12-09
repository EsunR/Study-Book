'''调用 bge 模型实现文本嵌入与向量检索'''
from FlagEmbedding import FlagAutoModel
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

model = FlagAutoModel.from_finetuned('BAAI/bge-base-en-v1.5')

question_sentences = [x['question'] for x in questions]
pdf_content_sentences = [x['content'] for x in pdf_content]

print("Encoding question sentences...")
question_embeddings = model.encode(
    question_sentences, normalize_embeddings=True)

print("Encoding pdf content sentences...")
pdf_embeddings = model.encode(
    pdf_content_sentences, normalize_embeddings=True)

print("Embed done")

print("Calculating similarity...")
for query_idx, feat in enumerate(question_embeddings):
    score = feat @ pdf_embeddings.T
    max_score_page_idx = score.argsort()[-1] + 1
    questions[query_idx]['reference'] = 'page_' + str(max_score_page_idx)

print("Writing to file...")
with open('./output/m3e-result.json', 'w', encoding='utf8') as up:
    json.dump(questions, up, ensure_ascii=False, indent=4)
