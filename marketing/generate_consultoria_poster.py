from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import textwrap

W, H = 1200, 1500
BG = (7, 16, 28)
BG2 = (14, 29, 49)
PANEL = (16, 27, 43)
PANEL_2 = (20, 37, 58)
TEXT = (244, 247, 250)
MUTED = (178, 189, 201)
ACCENT = (98, 216, 214)
GOLD = (229, 188, 112)
PURPLE = (232, 180, 255)
LINE = (37, 72, 104)

regular_path = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
bold_path = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

font_label = ImageFont.truetype(bold_path, 26)
font_small = ImageFont.truetype(regular_path, 24)
font_body = ImageFont.truetype(regular_path, 30)
font_body_bold = ImageFont.truetype(bold_path, 32)
font_h2 = ImageFont.truetype(bold_path, 34)
font_h1 = ImageFont.truetype(bold_path, 60)
font_stat = ImageFont.truetype(bold_path, 44)
font_cta = ImageFont.truetype(bold_path, 34)

img = Image.new("RGB", (W, H), BG)
draw = ImageDraw.Draw(img)

for y in range(H):
    r = int(BG[0] + (BG2[0] - BG[0]) * y / H)
    g = int(BG[1] + (BG2[1] - BG[1]) * y / H)
    b = int(BG[2] + (BG2[2] - BG[2]) * y / H)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

for radius, color in [
    (360, (18, 76, 92)),
    (260, (28, 47, 88)),
    (210, (70, 44, 22)),
]:
    x0 = W - radius - 60
    y0 = 40
    x1 = W - 60
    y1 = 40 + radius
    draw.ellipse((x0, y0, x1, y1), outline=color, width=2)

margin = 76

def draw_wrapped(text, x, y, font, fill, width_chars, spacing=8):
    lines = textwrap.wrap(text, width=width_chars, break_long_words=False)
    yy = y
    for line in lines:
        draw.text((x, yy), line, font=font, fill=fill)
        bbox = draw.textbbox((x, yy), line, font=font)
        yy += (bbox[3] - bbox[1]) + spacing
    return yy

# Tag
label = "CONSULTORIA ESPECIALIZADA EM IA"
draw.rounded_rectangle((margin, 54, margin + 510, 106), radius=24, outline=LINE, width=2, fill=(10, 22, 36))
draw.text((margin + 20, 68), label, font=font_label, fill=ACCENT)

# Headline
headline1 = "Sua empresa já tem os dados."
headline2 = "A concorrência já tem o ROI."
headline_y = 150
headline_y = draw_wrapped(headline1, margin, headline_y, font_h1, TEXT, 30, spacing=8)
headline_y = draw_wrapped(headline2, margin, headline_y + 8, font_h1, GOLD, 28, spacing=8)

sub = (
    "Muito dado, pouca decisão acionável. Pilotos que não saem do PowerPoint. "
    "Operação reativa em mercado preditivo."
)
sub_y = draw_wrapped(sub, margin, headline_y + 22, font_body, MUTED, 44, spacing=12)

# Symptom cards
card_y = sub_y + 34
gap = 14
card_w = (W - margin * 2 - gap * 2) // 3
symptoms = [
    ("01", "Muito dado", "Pouca decisão acionável"),
    ("02", "Pilotos de IA", "Parados no PowerPoint"),
    ("03", "Operação reativa", "Mercado preditivo"),
]
for i, (n, t1, t2) in enumerate(symptoms):
    x = margin + i * (card_w + gap)
    draw.rounded_rectangle((x, card_y, x + card_w, card_y + 156), radius=26, fill=PANEL, outline=LINE, width=2)
    draw.text((x + 24, card_y + 18), n, font=font_h2, fill=ACCENT)
    draw.text((x + 24, card_y + 64), t1, font=font_body_bold, fill=TEXT)
    draw_wrapped(t2, x + 24, card_y + 106, font_body, MUTED, 18, spacing=6)

# Positioning block
block_y = card_y + 194
draw.rounded_rectangle((margin, block_y, W - margin, block_y + 148), radius=28, fill=PANEL_2, outline=LINE, width=2)
draw.text((margin + 28, block_y + 24), "IA aplicada no ponto certo.", font=font_h2, fill=TEXT)
pos_text = "Boutique B2B. Sênior por padrão. ROI mensurável por contrato."
draw_wrapped(pos_text, margin + 28, block_y + 76, font_body, MUTED, 46, spacing=8)

# Sectors / case
sec_y = block_y + 182
left_x = margin
right_x = W // 2 + 10
col_w = W // 2 - margin - 18

# sectors panel
draw.rounded_rectangle((left_x, sec_y, left_x + col_w, sec_y + 300), radius=28, fill=PANEL, outline=LINE, width=2)
draw.text((left_x + 24, sec_y + 22), "Setores-foco", font=font_h2, fill=ACCENT)
sector_lines = [
    "Logística — roteirização, atrasos e frota",
    "Indústria — qualidade, perdas e manutenção",
    "Agroindústria — safra, IoT e rastreabilidade",
    "Supply Chain — S&OP, ruptura e compras",
]
y = sec_y + 82
for line in sector_lines:
    draw.text((left_x + 26, y + 2), "•", font=font_body_bold, fill=GOLD)
    y = draw_wrapped(line, left_x + 56, y, font_small, TEXT, 30, spacing=5)
    y += 10

# case panel
draw.rounded_rectangle((right_x, sec_y, right_x + col_w, sec_y + 300), radius=28, fill=(34, 25, 43), outline=(94, 69, 111), width=2)
draw.text((right_x + 24, sec_y + 22), "Case em produção", font=font_h2, fill=PURPLE)
draw.text((right_x + 24, sec_y + 86), "R$ 8 milhões/ano", font=font_stat, fill=TEXT)
case_text = "de economia em cabotagem marítima com algoritmo genético rodando em operação."
draw_wrapped(case_text, right_x + 24, sec_y + 152, font_body, MUTED, 24, spacing=8)

# CTA panel
cta_y = sec_y + 336
draw.rounded_rectangle((margin, cta_y, W - margin, cta_y + 290), radius=32, fill=(11, 21, 33), outline=(82, 157, 154), width=3)
draw_wrapped("30 minutos podem destravar seu próximo trimestre.", margin + 28, cta_y + 26, font_cta, TEXT, 38, spacing=8)
draw_wrapped("Conversa estratégica, sem compromisso e sem pitch genérico.", margin + 28, cta_y + 118, font_body, MUTED, 48, spacing=8)
draw.text((margin + 28, cta_y + 190), "Agende:", font=font_body_bold, fill=ACCENT)
draw.text((margin + 170, cta_y + 190), "https://lnkd.in/ermfAMJB", font=font_body, fill=TEXT)
draw.text((margin + 28, cta_y + 234), "Contato:", font=font_body_bold, fill=ACCENT)
draw.text((margin + 185, cta_y + 234), "giselle@coutofalcao.com", font=font_body, fill=TEXT)

footer_y = H - 34
draw.line((margin, footer_y, W - margin, footer_y), fill=LINE, width=2)

out = Path("/home/ubuntu/giselle-falcao-portfolio/marketing/consultoria-ia-poster.png")
out.parent.mkdir(parents=True, exist_ok=True)
img.save(out, quality=95)
print(out)
