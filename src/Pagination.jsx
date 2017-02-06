import { h } from 'preact';
import { omit } from 'lowline';

import qs from 'mini-qs'

export default ({ totalCount, query, perPage }) => {
  const path = window.location.pathname;

  const pages = [];
  query = window.location.search ? qs.parse(window.location.search.slice(1)) : {};
  const page = +query.page || 0;
  // page = +_.last(query.match(/(^|&)page=(\d+)/)) || 0,
  perPage = +query.limit || perPage;
  // perPage = +_.last(query.match(/(^|&)limit=(\d+)/)) || context.get('perPage'),
  let search = '';
  let number = 0;
  const end = perPage && totalCount / perPage;

  // remove page and empty params
  // query = _.filter(query.split('&'), function(str) {
  //  return str.indexOf('page=') && _.last(str) != '='
  // }).join('&')

  query = Object.entries(omit(query, 'page')).map((arr) => (
    arr.map(encodeURIComponent).join('=')
  )).join('&');

  if (query) {
    search = `?${query}`;
    query += '&';
  }

  while (number < end) {
    number += 1;
    pages.push({ search, number });
    search = `?${query}page=${number}`;
  }

  if (page < pages.length) {
    pages[page].current = true;
  }

  // min is for when totalCount is 0
  const firstIndex = Math.min(page * perPage + 1, totalCount);
  // min is for last (not full) page
  const lastIndex = Math.min((page + 1) * perPage, totalCount);
  const prev = pages[page - 1];
  const next = pages[page + 1];

  return (
    <div class="pagination">
      <div class="results">
        Showing items <span class="first number">{firstIndex}</span> - <span class="last number">{lastIndex}</span> out of <span class="total number">{totalCount}</span>
      </div>
      <ul>
        <li class="arrow">

          {prev
            ? <a href={path + prev.search} rel="prev" class="nav" title="Föregående sida">&laquo;</a>
            : <a href="javascript:;" title="Föregående sida">&laquo;</a>
          }
        </li>

        {pages.map((page) => (
          <li class={page.current && 'current'}>
            <a href={path + page.search} class="nav" rel={page.rel} title={`Sida ${number}`}>{page.number}</a>
          </li>
        ))}


        <li class="arrow">
          {next
            ? <a href={path + next.search} rel="next" class="nav" title="Nästa sida">&raquo;</a>
            : <a href="javascript:;" title="Nästa sida">&raquo;</a>
          }
        </li>
      </ul>
    </div>

  );
};
