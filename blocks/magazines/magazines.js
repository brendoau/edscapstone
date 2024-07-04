/*
 * Table Block
 * Recreate a table
 * https://www.hlx.live/developer/block-collection/table
 */

function buildCell(rowIndex) {
  const cell = rowIndex ? document.createElement('td') : document.createElement('th');
  if (!rowIndex) cell.setAttribute('scope', 'col');
  return cell;
}

export default async function decorate(block) {
  const url = '../query-index.json?limit=10';
  const jsonData = await fetchData(url);

  if (!jsonData) {
    return;
  }

  const container = document.createElement('div');
  container.classList.add('entry-container');

  jsonData.data.forEach((rowData) => {
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('entry');

    const link = document.createElement('a');
    link.href = rowData.path;

    if (rowData.image) {
      const img = document.createElement('img');
      img.src = rowData.image;
      img.alt = rowData.title;
      link.appendChild(img);
    }

    const textDiv = document.createElement('div');
    textDiv.classList.add('text-content');

    const title = document.createElement('h3');
    title.textContent = rowData.title;

    const description = document.createElement('p');
    description.textContent = rowData.description;

    textDiv.appendChild(title);
    textDiv.appendChild(description);
    entryDiv.appendChild(link);
    entryDiv.appendChild(textDiv);
    container.appendChild(entryDiv);
  });

  block.innerHTML = '';
  block.append(container);
}

// export default async function decorate(block) {

//   const url = '../query-index.json?limit=10';
//   const jsonData = await fetchData(url);

//   if (!jsonData) {
//     return;
//   }

//   const table = document.createElement('table');
//   const thead = document.createElement('thead');
//   const tbody = document.createElement('tbody');

//   // Build the table header
//   const headerRow = document.createElement('tr');
//   const headers = Object.keys(jsonData.data[0]);
//   headers.forEach((header) => {
//     const th = buildCell(0);
//     th.textContent = header;
//     headerRow.append(th);
//   });
//   thead.append(headerRow);
//   table.append(thead);

//   // Build the table body
//   jsonData.data.forEach((rowData) => {
//     const row = document.createElement('tr');
//     headers.forEach((header) => {
//       const td = buildCell(1);
//       td.textContent = rowData[header];
//       row.append(td);
//     });
//     tbody.append(row);
//   });
  
//   table.append(tbody);
//   block.innerHTML = '';
//   block.append(table);
// }

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}