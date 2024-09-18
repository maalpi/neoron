module.exports = {
    extends: [
      'next/core-web-vitals',
      // Outras extensões se necessário
    ],
    plugins: ['next'],
    rules: {
      '@typescript-eslint/ban-ts-comment': ['off'],
      '@typescript-eslint/no-unused-vars': ['off'],
      '@typescript-eslint/no-explicit-any': ['off'],
    },
  };
  