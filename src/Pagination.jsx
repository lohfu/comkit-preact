import { h } from 'preact'
import { omit } from 'lowline'

import qs from 'mini-qs'

const Pagination = ({ totalCount, query, perPage }) => {
  const path = window.location.pathname

  const pages = []
  query = window.location.search ? qs.parse(window.location.search.slice(1)) : {}
  const page = +query.page || 0
  // page = +_.last(query.match(/(^|&)page=(\d+)/)) || 0,
  perPage = +query.limit || perPage
  // perPage = +_.last(query.match(/(^|&)limit=(\d+)/)) || context.get('perPage'),
  let search = ''
  let number = 0
  const end = perPage && totalCount / perPage

  // remove page and empty params
  // query = _.filter(query.split('&'), function(str) {
  //  return str.indexOf('page=') && _.last(str) != '='
  // }).join('&')

  query = Object.entries(omit(query, 'page')).map((arr) => (
    arr.map(encodeURIComponent).join('=')
  )).join('&')

  if (query) {
    search = `?${query}`
    query += '&'
  }

  while (number < end) {
    number += 1
    pages.push({ search, number })
    search = `?${query}page=${number}`
  }

  if (page < pages.length) {
    pages[page].current = true
  }

  // min is for when totalCount is 0
  const firstIndex = Math.min(page * perPage + 1, totalCount)
  // min is for last (not full) page
  const lastIndex = Math.min((page + 1) * perPage, totalCount)
  const prev = pages[page - 1]
  const next = pages[page + 1]

  return (
    <div className='pagination'>
      <div className='results'>
        Showing items <span className='first number'>{firstIndex}</span> - <span className='last number'>{lastIndex}</span> out of <span className='total number'>{totalCount}</span>
      </div>
      <ul>
        <li className='arrow'>

          {prev
            ? <a href={path + prev.search} rel='prev' className='nav' title='Föregående sida'>&laquo;</a>
            : <a href='javascript:;' title='Föregående sida'>&laquo;</a>
          }
        </li>

        {pages.map((page) => (
          <li className={page.current && 'current'}>
            <a href={path + page.search} className='nav' rel={page.rel} title={`Sida ${number}`}>{page.number}</a>
          </li>
        ))}

        <li className='arrow'>
          {next
            ? <a href={path + next.search} rel='next' className='nav' title='Nästa sida'>&raquo;</a>
            : <a href='javascript:;' title='Nästa sida'>&raquo;</a>
          }
        </li>
      </ul>
    </div>

  )
}

export default Pagination
