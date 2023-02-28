const heights = [{heights:150, text:'algo1'}, 
                {heights:150, text:'algo2'},
{heights:150, text:'algo1'},
{heights:150, text:'algo1'},
{heights:150, text:'algo1'},
{heights:150, text:'algo1'},
{heights:150, text:'algo1'},
{heights:150, text:'algo1'},
{heights:150, text:'algo1'},
{heights:150, text:'algo1'},
{heights:150, text:'algo1'},
{heights:150, text:'algo10'},
];



{heights.map((height, index) => (
    <Item key={index} sx={{ height }}>
      {height.text}
    </Item>
  ))}