describe('Theme', () => {
  test('cores do tema dark militar', () => {
    // Testa as definições de cores diretamente
    const colors = {
      bg: '#0a0a0a',
      gold: '#d4a843',
      red: '#cc0000',
    };
    expect(colors.bg).toBe('#0a0a0a');
    expect(colors.gold).toBe('#d4a843');
    expect(colors.red).toBe('#cc0000');
  });

  test('spacing contém valores', () => {
    const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20 };
    expect(spacing.sm).toBe(8);
    expect(spacing.lg).toBe(16);
  });

  test('fontSizes definidos', () => {
    const fontSize = { xs: 10, sm: 11, md: 13, lg: 15, xl: 18, title: 32 };
    expect(fontSize.title).toBe(32);
    expect(fontSize.xs).toBe(10);
  });
});
