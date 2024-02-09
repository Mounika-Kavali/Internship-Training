import React, { Component } from 'react'
import Handlebars from 'handlebars';
import { users,names,numbers,user1 } from '../TemplateData'; 




export class HandlebarsTemplate2 extends Component {
    constructor() {
        super();
        Handlebars.registerHelper('eq', function (a, b) {
            return a === b;
          });
          // Register the not helper
        Handlebars.registerHelper('not', function (a) {
            return !a;
          });
        // Register the toUpperCase helper
        Handlebars.registerHelper('toUpperCase', function (str) {
          return str.toUpperCase();
        });
        // Register the 'even' helper
        Handlebars.registerHelper('even', function(index) {
        return index % 2 === 0;
        });
        // Register the 'addValue' and 'subtractValue' helpers
        const context = { total: 0 };
        Handlebars.registerHelper('addValue', function(value) {
            context.total += value;
            return context.total;
        });
        Handlebars.registerHelper('subtractValue', function(value) {
            context.total -= value;
            return context.total;
        });
      }
  render() {
     // Define the Handlebars template
     const userTemplate = `
     {{#each users}}
       <div class="user-card">
         <h2>{{name}}</h2>
         <p>Email: {{email}}</p>
         <p>Age: {{age}}</p>
       </div>
     {{/each}}
   `;
   const nameTemplate = `
   <h2>BLOCK HELPERS</h2>
   <ul>
     {{!--#unless helper is used to conditionally render content when the provided expression evaluates to a falsy value (false, 0, null, undefined, or an empty string). It is the opposite of the #if helper.--}}
     {{!-- if the current element (this) is not equal to "Ravan". The 'eq' helper is used to perform the comparison. --}}
     
     {{#each users}}
       {{#unless (eq this.name "John Doe")}}
         <li>{{this.name}}</li>
       {{/unless}}
     {{/each}}
    </ul>


    <ul>
     {{#each names}}
       {{#if (not (eq this "Ravan"))}}
            <li  style="color: green;">{{this}}</li>
            {{else}}
                <p style="color: red;">Raavan!</p>
        {{/if}}   
     {{/each}}
   </ul>
 `;

    const expressionsTemplate=`
    <h2>EXPRESSION HELPERS</h2>
    {{!-- lookup helper is used to access the value at the specific index of the names array. --}}
    {{!--  "../@index" syntax refers to the index of the current iteration relative to the parent each block. --}}
    <ul>
        <li>{{#if (eq (lookup names 4) "hanuman")}}{{toUpperCase (lookup names 4)}}{{else}}{{lookup names 4}}{{/if}}</li>
    
        {{#each names}}
          <p>
            {{#if (eq @index 1)}}
              Janaki
            {{else}}
              {{this}} ({{@index}})
            {{/if}}
          </p>
        {{/each}}
    </ul>
    <p>
    {{#each numbers}}
        {{#if (even @index)}}
          <h4>Add even index:{{addValue this}}</h4>
        {{else}}
        <h4> Subtract odd Value: {{subtractValue this}}</h4>
        {{/if}}
      {{/each}}
      {{!--<h4>Final Subtract Value: {{subtractValue 0}}</h4>--}}
    </p>

    `;
   // Compile the template
   const template1 = Handlebars.compile(userTemplate);
   const template2 = Handlebars.compile(nameTemplate);
   const template3 = Handlebars.compile(expressionsTemplate);
   // Render the template with the data
   const renderedTemplate1 = template1({ users });
   const renderedTemplate2 = template2({ names,users });
   const renderedTemplate3 = template3({ names,numbers });

   return (
 
    <div>
      <div dangerouslySetInnerHTML={{ __html: renderedTemplate1 }} />
      <div dangerouslySetInnerHTML={{ __html: renderedTemplate2 }} />
      <div dangerouslySetInnerHTML={{ __html: renderedTemplate3 }} />
    </div>
    
  );
  
 
  }
}

export default HandlebarsTemplate2