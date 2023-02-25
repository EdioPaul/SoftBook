describe('Detail books', () => {
  it('should find detail book', async () => {
    const id = '1'
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(id)
  })
})
