<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th colspan="2" style="border: 2px solid #000; background-color: #dbeafe; padding: 8px; text-align: left;">GET</th>
  </tr>
  <tr>
    <td style="border: 1px solid #000; padding: 8px;">order with empty username and password</td>
    <td style="border: 1px solid #000; padding: 8px;">500 - INTERNAL_SERVER_ERROR</td>
  </tr>
    <tr>
    <td style="border: 1px solid #000; padding: 8px;">order with valid username and valid password</td>
    <td style="border: 1px solid #000; padding: 8px;"> 200 - OK</td>
  </tr>
    <tr>
    <td style="border: 1px solid #000; padding: 8px;">order with valid username without password </td>
    <td style="border: 1px solid #000; padding: 8px;"> 500 - INTERNAL_SERVER_ERROR</td>
  </tr>
      <tr>
    <td style="border: 1px solid #000; padding: 8px;"> order with valid password without username</td>
    <td style="border: 1px solid #000; padding: 8px;">500 - INTERNAL_SERVER_ERROR </td>
  </tr>
      <tr>
    <td style="border: 1px solid #000; padding: 8px;">Order with blanks as username and password </td>
    <td style="border: 1px solid #000; padding: 8px;"> 200 - OK</td>
  </tr>
      <tr>
    <td style="border: 1px solid #000; padding: 8px;">order with id = 0  </td>
    <td style="border: 1px solid #000; padding: 8px;"> 400 - BAD_REQUEST</td>
  </tr>
     <tr>
    <td style="border: 1px solid #000; padding: 8px;">oorder with negative id than </td>
    <td style="border: 1px solid #000; padding: 8px;"> 400 - BAD_REQUEST</td>
  </tr>
      <tr>
    <td style="border: 1px solid #000; padding: 8px;">order with id = 3 </td>
    <td style="border: 1px solid #000; padding: 8px;"> Receive 200 - OK </td>
  </tr>
  
  <tr>
    <th colspan="2" style="border: 2px solid #000; background-color: #dbeafe; padding: 8px; text-align: left;"> DELETE </th>
  </tr>
  <tr>
    <td style="border: 1px solid #000; padding: 8px;"> order with existing id and valid api key </td>
    <td style="border: 1px solid #000; padding: 8px;"> 204 - NO-CONTENT </td>
  </tr>
   <tr>
    <td style="border: 1px solid #000; padding: 8px;"> order with negative id and valid api key </td>
    <td style="border: 1px solid #000; padding: 8px;"> 400 - BAD_REQUEST </td>
  </tr>
   <tr>
    <td style="border: 1px solid #000; padding: 8px;"> order with existing id and invalid api key </td>
    <td style="border: 1px solid #000; padding: 8px;"> 401 - UNAUTHORIZED </td>
  </tr>
  
  <tr>
    <th colspan="2" style="border: 2px solid #000; background-color: #dbeafe; padding: 8px; text-align: left;">PUT</th>
  </tr>
   <tr>
    <td style="border: 1px solid #000; padding: 8px;"> order with valid id and 18 digit api key </td>
    <td style="border: 1px solid #000; padding: 8px;"> 401 - UNAUTHORIZED </td>
  </tr>
   <tr>
    <td style="border: 1px solid #000; padding: 8px;"> order with valid id and 16 digit string api key </td>
    <td style="border: 1px solid #000; padding: 8px;"> 401 - UNAUTHORIZED </td>
  </tr>
   <tr>
    <td style="border: 1px solid #000; padding: 8px;"> order with invalid id and valid api key </td>
    <td style="border: 1px solid #000; padding: 8px;"> 400 - BAD_REQUEST </td>
  </tr>
   <tr>
    <td style="border: 1px solid #000; padding: 8px;"> order with valid id valid api key withoud body </td>
    <td style="border: 1px solid #000; padding: 8px;"> 400 - BAD_REQUEST </td>
  </tr>
  <tr>
    <td style="border: 1px solid #000; padding: 8px;">order with valid id, valid api key string courierId </td>
    <td style="border: 1px solid #000; padding: 8px;">400 - BAD_REQUEST</td>
  </tr>
   <tr>
    <td style="border: 1px solid #000; padding: 8px;"> order with string id, valid api key </td>
    <td style="border: 1px solid #000; padding: 8px;"> 400 - BAD_REQUEST </td>
  </tr>
   <tr>
    <td style="border: 1px solid #000; padding: 8px;"> order with valid id valid api key </td>
    <td style="border: 1px solid #000; padding: 8px;"> 200 - OK </td>
  </tr>
</table>
