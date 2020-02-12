const files = ['products', 'payment_method']

var guideTexts = [];

files.map(file => {
    import(file).then(({default: data}) => guideTexts.push(data))
})

export default guideTexts