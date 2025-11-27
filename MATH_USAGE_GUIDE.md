# Mathematical Notation Usage Guide

## Current Working Features

### ✅ **Math Equation Blocks**
For complex mathematical expressions, use the **"Math Equation"** content type in the rich text editor:

**Examples:**
- `E = mc^2` 
- `\sum_{i=1}^{n} x_i`
- `\frac{a}{b}`
- `\hat{Y} = X\beta`
- `\alpha + \beta = \gamma`

**How to use:**
1. In the rich text editor, click the "+" button
2. Select "Math Equation" 
3. Enter your LaTeX equation
4. **Choose display mode:**
   - **Inline (unchecked)**: Renders within the sentence flow
   - **Block (checked)**: Renders on its own line, centered
5. Add optional caption

**Display Modes:**
- **Inline**: `\hat{Y}` appears within text like "The model predicts Ŷ using features"
- **Block**: Equations appear centered on their own line

### ✅ **Unicode Mathematical Symbols**
You can directly type or paste Unicode mathematical symbols:

**Greek Letters:** α, β, γ, δ, ε, θ, λ, μ, σ, π, φ, ψ, ω
**Operators:** ∇, ∂, ∑, ∏, ∫, ∞, ±, ≤, ≥, ≠, ≈
**Subscripts:** x₁, x₂, x₃, xᵢ, xⱼ
**Superscripts:** x², x³, xᵀ, x⁻¹

### ✅ **Glossary Term Highlighting**
Mathematical terms in your content will automatically get glossary tooltips when they match terms in your glossary.

### ✅ **Clean Rich Text Editor**
- **Bold**, *italic*, `code` formatting
- Headings (H1-H4)
- Lists (bullet, numbered)
- Images with captions
- Code blocks with syntax highlighting
- Video embeds
- Clean blockquotes

## Best Practices

### For Simple Symbols
Just type Unicode symbols directly:
- "The learning rate α controls convergence"
- "Features x₁, x₂, x₃ are normalized"
- "The gradient ∇ points upward"

### For Complex Equations
Use Math Equation blocks:
- Loss functions: `L = \frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2`
- Probability: `P(X|Y) = \frac{P(Y|X)P(X)}{P(Y)}`
- Matrix operations: `X^T X \beta = X^T y`

### For Mixed Content
Combine both approaches:
- "The model minimizes the loss function [Math Equation Block] using gradient descent with learning rate α = 0.01"

## Tips

✅ **Copy-paste friendly** - Unicode symbols work directly  
✅ **Professional rendering** - Math equations render beautifully  
✅ **Glossary integration** - Terms still get highlighted  
✅ **Theme support** - Works in light and dark modes  
✅ **No duplication** - Clean, single rendering  

This approach provides reliable mathematical notation without the complexity and duplication issues of automatic LaTeX processing.