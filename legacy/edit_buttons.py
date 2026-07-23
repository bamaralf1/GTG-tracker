with open(r'C:\Users\PICHAU\Desktop\GTG\styles.css', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add transform to .btn transition
old = '.btn:active{opacity:.85}'
new = '''.btn:active{opacity:.85;transform:scale(.96)}
.btn-icon:active,.test-max-btn:active,.timer-btn:active,.rm-btn:active,.toggle-btn:active,.cal-nav-btn:active{transform:scale(.96)}
@media (prefers-reduced-motion:reduce){
  .btn:active, .btn-icon:active, .test-max-btn:active{transform:none}
}'''

content = content.replace(old, new, 1)

# 2. Add transform to .btn transition
old2 = '.btn{display:inline-flex;align-items:center;gap:6px;font-family:inherit;letter-spacing:0.06em;border:none;cursor:pointer;padding:7px 16px;font-size:14px;transition:background .2s var(--ease-expo),opacity .2s var(--ease-expo);border-radius:6px;'
new2 = '.btn{display:inline-flex;align-items:center;gap:6px;font-family:inherit;letter-spacing:0.06em;border:none;cursor:pointer;padding:7px 16px;font-size:14px;transition:background .2s var(--ease-expo),opacity .2s var(--ease-expo),transform .15s var(--ease-expo, ease);border-radius:6px;'

content = content.replace(old2, new2, 1)

# 3. Add touch target mobile styles at end of file
old3 = '[data-theme=light] .form-input:focus{'
# Find the last occurrence (near end of file)
last_idx = content.rfind(old3)
# Find the closing brace
close = content.find('}', last_idx)
# Find what comes after
rest = content[close+1:]

touch_css = """
@media (max-width:600px){
  .exercise-add-form .btn,
  .exercise-card-actions .btn-icon{
    min-height:40px;
  }
  .exercise-add-form .btn-red{
    flex:1 1 100%;
  }
}
"""

content = content[:close+1] + touch_css + rest

with open(r'C:\Users\PICHAU\Desktop\GTG\styles.css', 'w', encoding='utf-8') as f:
    f.write(content)
print("Done")
