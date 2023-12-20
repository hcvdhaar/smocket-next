module.exports = function Plopper(plop) {
  // Scaffold a new component
  plop.setGenerator('component', {
    description: 'scaffolding for new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name',
        validate(data) {
          if (data === '') {
            return `Don't be shy gimme a component name, try again bro!`;
          }
          return true;
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'app/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/react.tsx.hbs',
      },
      {
        type: 'add',
        path: 'app/components/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
        templateFile: 'plop-templates/react.test.tsx.hbs',
      },
      {
        type: 'add',
        path: 'app/components/{{pascalCase name}}/index.ts',
        templateFile: 'plop-templates/react.index.ts.hbs',
      },
      {
        type: 'append',
        path: 'app/components/index.ts',
        pattern: `/* Append here */`,
        template: `export * from './{{pascalCase name}}';`,
      },
    ],
  });

  // Scaffold a new page component
  // TODO: Make this work for NEXT JS
  // plop.setGenerator('page component', {
  //   description: 'scaffolding for a new page component',
  //   prompts: [
  //     {
  //       type: 'input',
  //       name: 'name',
  //       message: 'Pages component name',
  //     },
  //   ],
  //   actions: [
  //     {
  //       type: 'add',
  //       path: 'src/pages/{{pascalCase name}}/{{pascalCase name}}.tsx',
  //       templateFile: 'plop-templates/react.tsx.hbs',
  //     },
  //     {
  //       type: 'add',
  //       path: 'src/pages/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
  //       templateFile: 'plop-templates/react.test.tsx.hbs',
  //     },
  //     {
  //       type: 'add',
  //       path: 'src/pages/{{pascalCase name}}/index.ts',
  //       templateFile: 'plop-templates/react.index.ts.hbs',
  //     },
  //     {
  //       type: 'add',
  //       path: 'src/pages/{{pascalCase name}}/{{pascalCase name}}.module.css',
  //       templateFile: 'plop-templates/react.module.css.hbs',
  //     },
  //     {
  //       type: 'append',
  //       path: 'src/pages/index.ts',
  //       pattern: `/* Append here */`,
  //       template: `export * from './{{pascalCase name}}';`,
  //     },
  //   ],
  // });

  // Scaffold a new layout component
  // TODO: Make this work for NEXT JS
  // plop.setGenerator('layout', {
  //   description: 'scaffolding for a new layout component',
  //   prompts: [
  //     {
  //       type: 'input',
  //       name: 'name',
  //       message: 'Layout component name',
  //     },
  //   ],
  //   actions: [
  //     {
  //       type: 'add',
  //       path: 'src/layout/{{pascalCase name}}/{{pascalCase name}}.tsx',
  //       templateFile: 'plop-templates/react.tsx.hbs',
  //     },
  //     {
  //       type: 'add',
  //       path: 'src/layout/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
  //       templateFile: 'plop-templates/react.test.tsx.hbs',
  //     },
  //     {
  //       type: 'add',
  //       path: 'src/layout/{{pascalCase name}}/index.ts',
  //       templateFile: 'plop-templates/react.index.ts.hbs',
  //     },
  //     {
  //       type: 'add',
  //       path: 'src/layout/{{pascalCase name}}/{{pascalCase name}}.module.css',
  //       templateFile: 'plop-templates/react.module.css.hbs',
  //     },
  //     {
  //       type: 'append',
  //       path: 'src/layout/index.ts',
  //       pattern: `/* Append here */`,
  //       template: `export * from './{{pascalCase name}}';`,
  //     },
  //   ],
  // });
};
