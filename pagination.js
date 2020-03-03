import lodash from 'lodash'

export function pagination(data,pageNumber,pageSize)
{
    const begin= (pageNumber-1)*pageSize
    return lodash(data).slice(begin).take(pageSize).value()
}