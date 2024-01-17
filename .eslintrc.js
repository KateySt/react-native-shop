module.exports = {
    root: true,
    extends: [
        'universe/native',
    ],
    overrides: [
        {
            files: [
                '*.ts',
                '*.tsx',
                '*.d.ts'
            ],
            rules: {
                'prettier/prettier': [
                    'warn',
                    {
                        printWidth: 120,
                        tabWidth: 2,
                        singleQuote: true,
                        bracketSameLine: true,
                    }
                ]
            }
        },
    ],
};
