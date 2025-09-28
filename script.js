/* ========= CONFIGURE CONTENT HERE ========= */
    const BOT_DATA = {
      botName: "Vinothagan Bot",
      avatarLetter: "V",
      welcome: "Hi there! I am vinothgan's chatbot. I can provide you with quick information about him.",
      quickOptions: [
        { key: "bio", label: "Bio" },
         { key: "skills", label: "Skills" },
         { key: "projects", label: "Projects" },
         { key: "education", label: "Education"},
        { key: "contact", label: "Contact" }
      ],
      content: {
        bio: `Hi — I'm Vinothagan. Motivated Frontend Developer skilled in JavaScript, React, and modern web tech. Transitioned from Business administration to IT, blending business insight with technical skills. Passionate about creating responsive, user-friendly web apps and delivering high-quality frontend solutions.`,
         skills: `TECHNICAL SKILLS

                       • Programming Languages : JavaScript , C++ (basics)
                       • Web Development: Html5, Css3 , React.js
                       • Frameworks: Tailwinds Css , Bootstrap , Next.js , React
                       • Tools: Git , Github , Visual Studio Code
                       • Operating Systems: Windows , Linux (ubuntu)

                  BUSINESS & PROFESSIONAL SKILLS

                       • Project management- Tools: Ms project (basics)
                       • Financial management- Tools: Ms Excel (basics)`,

         projects: `PROJECTS

                  -ChatBot Quick Response Portfolio <a href='https://vinothagan-chat-bot.netlify.app/'>see</a>

                  • Designed and developed a chatbot - based portfolio to showcase projects and skills in an interactive way.
                  • Implement dynamic response using JS to enhance user engagement.
                  • Integrated portfolio sections(About , Skills , Projects ,Education , Contact) within the chatbot flow.
                  
                  -Responsive Restaurant website <a href='https://gfcc-nation.netlify.app/'>see</a>

                  • Developed a responsive restaurant website using Javascript , Tailwinds css.
                  • Designed attractive layouts for menu , gallery and contact to improve user experience.
                  • Implement responsive design for seamless viewing on desktop and mobile devices.
                  
                  -Vidtube - Youtube clone website <a href='https://vidtube-new.netlify.app/'>see</a>

                  • Developed a response video streaming website simulating youtube’s core features using JS , Tailwinds CSS.`,
        contact: "📞 Email: vinothagan2004@gmail.com\n📱 Phone: +91 **********\n🔗 LinkedIn: <a href=''>linkedin.com/in/vinothagan</a>",
        education: `Bachelor of Business Administration (BBA)  
                  Bharathidasan University, Tiruchirappalli, Tamilnadu, India  | 2021-2024
                  • Specialization in Business Administration and Management.
                  • Strong foundation in "Financial management and marketing".`
        
      },
      bossQuestion: "Do you like my boss?",
      bossYes: "Thank you, I am glad for your answer.",
      bossNo: "No problem! I'm glad you came here."
    };
    /* ========================================== */

    // DOM refs
    const messagesEl = document.getElementById('messages');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const botNameEl = document.getElementById('botName');
    const avatarEl = document.getElementById('avatar');

    // init UI values
    //botNameEl.textContent = BOT_DATA.botName;
    // avatarEl.textContent = BOT_DATA.avatarLetter;

    // utility: create message bubble
    function createBubble(text, who='bot') {
      const wrap = document.createElement('div');
      const bubble = document.createElement('div');
      bubble.className = 'bubble ' + (who === 'bot' ? 'bot' : 'user');
      // preserve newlines
      bubble.innerHTML = text.split('\n').map(escapeHtml).join('<br>');

      //you can add link <=
      bubble.innerHTML = text.split('\n').join('<br>')

      wrap.appendChild(bubble);

      const meta = document.createElement('div');
      meta.className = 'meta';
      meta.textContent = who === 'bot' ? 'Vinoth\'s Chatbot' : 'You';
      wrap.appendChild(meta);
      wrap.style.display = 'flex';
      wrap.style.flexDirection = 'column';
      wrap.style.alignItems = who === 'bot' ? 'flex-start' : 'flex-end';
      return wrap;
    }

    function escapeHtml(s) {
      return s.replace(/[&<>"']/g, function(m){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]; });
    }

    // show bot typing simulation then a message
    function botReply(message, afterMs = 500) {
      // show a small typing bubble
      const typing = document.createElement('div');
      typing.className = 'bubble bot';
      typing.textContent = '...';
      const typingWrap = document.createElement('div');
      typingWrap.appendChild(typing);
      typingWrap.style.display='flex'; typingWrap.style.flexDirection='column'; typingWrap.style.alignItems='flex-start';

      messagesEl.appendChild(typingWrap);
      scrollToBottom();

      setTimeout(() => {
        messagesEl.removeChild(typingWrap);
        const bubble = createBubble(message, 'bot');
        messagesEl.appendChild(bubble);
        scrollToBottom();
      }, afterMs);
    }

    // auto-scroll
    function scrollToBottom() {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    // handle quick option clicks
    function renderChips() {
      const chips = document.createElement('div');
      chips

 
className = 'chips';
      BOT_DATA.quickOptions.forEach(opt => {
        const c = document.createElement('button');
        c.className = 'chip';
        c.textContent = opt.label;
        c.setAttribute('data-key', opt.key);
        c.onclick = () => {
          showUserMessage(opt.label);
          // small delay to appear natural
          setTimeout(() => handleOption(opt.key), 300);
        };
        chips.appendChild(c);
      });
      return chips;
    }

    // show user-sent message bubble
    function showUserMessage(text) {
      const bubble = createBubble(text, 'user');
      messagesEl.appendChild(bubble);
      scrollToBottom();
    }

    // handle option selected
    function handleOption(key) {
      if (BOT_DATA.content[key]) {
        botReply(BOT_DATA.content[key], 600);
        if (key === 'contact'){
            setTimeout(() => {
        const q = createBubble(BOT_DATA.bossQuestion, 'bot');
        messagesEl.appendChild(q);

        // yes/no buttons
        const row = document.createElement('div');
        row.className = 'chips';
        const yes = document.createElement('button');
        yes.className = 'chip'; yes.textContent = 'Yes'; yes.onclick = () => {
          showUserMessage('Yes');
          setTimeout(()=> botReply(BOT_DATA.bossYes, 700), 300);
        };
        const no = document.createElement('button');
        no.className = 'chip'; no.textContent = 'No'; no.onclick = () => {
          showUserMessage('No');
          setTimeout(()=> botReply(BOT_DATA.bossNo, 700), 300);
        };
        row.appendChild(yes); row.appendChild(no);
        messagesEl.appendChild(row);
        scrollToBottom();
      }, 10000);
        }
      } else {
        botReply("st joseph high secondary school.");
      }
    }

    // initial flow on page load
    function startConversation() {
      messagesEl.innerHTML = '';
      // welcome
      const w = createBubble(BOT_DATA.welcome, 'bot');
      messagesEl.appendChild(w);

      // show chips
      const chipsWrap = document.createElement('div');
      chipsWrap.appendChild(renderChips());
      messagesEl.appendChild(chipsWrap);

      // ask boss question
            
        
      }

    // send handler: user typed a message manually
    function sendMessageFromInput() {
      const text = userInput.value.trim();
      if (!text) return;
      showUserMessage(text);
      userInput.value = '';
      // basic interpretation: check if user typed one of keys
      const lower = text.toLowerCase();
      if (lower.includes('contact') || lower.includes('phone') || lower.includes('@')) {
        setTimeout(()=> botReply(BOT_DATA.content.contact, 600), 300);
      } else if (lower.includes('project') || lower.includes('portfolio')) {
        setTimeout(()=> botReply(BOT_DATA.content.projects, 600), 300);
      } else if (lower.includes('skill')) {
        setTimeout(()=> botReply(BOT_DATA.content.skills, 600), 300);
      } else if (lower.includes('bio') || lower.includes('about')) {
        setTimeout(()=> botReply(BOT_DATA.content.bio, 600), 300);
      } else if(lower.includes('education') || lower.includes('school') || lower.includes('college')){
        setTimeout(()=> botReply(BOT_DATA.content.education,600), 300);
      } else if (lower.includes('yes') || lower.includes('love')) {
        setTimeout(()=> botReply(BOT_DATA.bossYes, 600), 300);
      } else {
        // fallback friendly reply
        setTimeout(()=> botReply("I'm glad that you're here sir— I saved that. You can also click Contact, Projects, Skills, or Bio for quick info." , 700), 300);
      }
    }

    // event wiring
    sendBtn.addEventListener('click', sendMessageFromInput);
    userInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessageFromInput();
      }
    });

    // initialize
    startConversation();

    // expose a tiny helper to update data from console if needed:
    window.__CHATBOT = {
      BOT_DATA,
      startConversation
    };