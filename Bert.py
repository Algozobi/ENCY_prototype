import torch
from transformers import AutoTokenizer, AutoModelForQuestionAnswering

# name = "twmkn9/albert-base-v2-squad2"
# name = "distilbert-base-uncased-distilled-squad"
# name = "mrm8488/bert-small-finetuned-squadv2"
name = "bert-large-uncased-whole-word-masking-finetuned-squad"

tokenizer = AutoTokenizer.from_pretrained(name,)

model = AutoModelForQuestionAnswering.from_pretrained(name, return_dict=False)

def answer_question(question):
    '''
    Takes a `question` string and tries to identify 
    the words within the `answer` that can answer the question. Prints them out.
    '''
    # context_text = "Sedan 2018 Har Vårt Nya Team Lyckats Förstå Branschens Behov Och Skapat Pålitliga Produkter För Att Lösa Dem Alla.Vi lever i ett föränderligt samhälle med stort behov av hållbara lösningar. Med nya globala patalogiska och specifika miljöutmaningar samt nya agendor från EU, har vi på ENCY antagit utmaningen för att tillgodose dessa behov. Vårt unika team består av personer med djup förståelse för innovation inom affärsutveckling, svensk kvalitetsdesign samt biomedicin. Genom tät kontakt med befintliga kunder och leverantörer, har vi sett till att lösningarna vi levererar tillgodoser hela branschens behov. Vidare hjälper vi till att skapa en ovärderlig samhällsnytta i form av sänkt energikonsumtion, bättre luftkvalitet med minskad spridning av luftburna virus och sjukdomar, samt minimerat ekologiska fotavtryck. Vi behöver sällan prata priser med kunder eftersom alla förstår värdet av den imponerande låga återbetalningstiden på runt 12 månader. Detta bevisar att våra lösningar resulterar i störst energibesparing per använd krona. Detta är vi extremt stolta över. Var med och hjälp oss att leda Nordens hållbarhetsarbete in i framtiden. Använd världens mest energieffektiva produkter."
    context_text = "Big Ass Fans designs and manufactures large-diameter ceiling fans for industrial and commercial use. It is headquartered in Lexington, Kentucky, where all aspects of the business are centered, from R&D to assembly to marketing to sales."
    # tokenize the input text and get the corresponding indices
    token_indices = tokenizer.encode(question, context_text)

    # Search the input_indices for the first instance of the `[SEP]` token.
    sep_index = token_indices.index(tokenizer.sep_token_id)

    seg_one = sep_index + 1

    # The remainders lie in the second segment.
    seg_two = len(token_indices) - seg_one
    
    # Construct the list of 0s and 1s.
    segment_ids = [0]*seg_one + [1]*seg_two

    # get the answer for the question
    start_scores, end_scores = model(torch.tensor([token_indices]), # The tokens representing our input combining question and answer.
                                    token_type_ids=torch.tensor([segment_ids])) # The segment IDs to differentiate question from answer

    # Find the tokens with the highest `start` and `end` scores.
    answer_begin = torch.argmax(start_scores)
    answer_end = torch.argmax(end_scores)

    # Get the string versions of the input tokens.
    indices_tokens = tokenizer.convert_ids_to_tokens(token_indices)
    
    answer = indices_tokens[answer_begin:answer_end+1]
    #remove special tokens
    answer = [word.replace("▁","") if word.startswith("▁") else word for word in answer] #use this when using model "twmkn9/albert-base-v2-squad2"
    answer = " ".join(answer).replace("[CLS]","").replace("[SEP]","").replace(" ##","")
    
    return answer