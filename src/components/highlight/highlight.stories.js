import {storiesOf} from '@storybook/vue'
import {text} from '@storybook/addon-knobs'
import Vue from 'vue'

import Highlight from './index'

Vue.use(Highlight)

storiesOf('Components|Highlight', module)
  .add('代码高亮', () => ({
    template: `
      <div>
        <ej-hightlight :styleName="styleName" :language="language">
          CREATE TABLE "topic" (
            "id" serial NOT NULL PRIMARY KEY,
            "forum_id" integer NOT NULL,
            "subject" varchar(255) NOT NULL
          );
          ALTER TABLE "topic"
          ADD CONSTRAINT forum_id FOREIGN KEY ("forum_id")
          REFERENCES "forum" ("id");

          -- Initials
          insert into "topic" ("forum_id", "subject")
          values (2, 'D''artagnian');
        </ej-hightlight>
      </div>
    `,
    props: {
      styleName: {
        default: text('主题名称', 'monokai-sublime'),
      },
      language: {
        default: text('语言', 'sql'),
      },
    },
  }))
